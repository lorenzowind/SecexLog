const Sequelize = require("sequelize");
const { Path, City, Holiday, Modal, Provider } = require("../../models");
const { sortPaths } = require("../../utils/sortPaths")

const Operation = Sequelize.Op;
const daysInPt = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado'
];
var duration = 0;
var auxDuration = null;

async function getCityId(city) {
    try {
        const response = await City.findOne({
            attributes: ['id'],
            where: {
                nome: city
            }
        });

        return response.dataValues;

    } catch (error) {
        console.log("function getCityId error: " + error);
        return { "error": error };
    }
}

async function getWarnings(city1, city2, dateDep, dateReg) {
    const warnings = [];

    const cityDep = await getCityId(city1);
    const cityReg = await getCityId(city2);

    try {
        const observations = await City.findAll({
            attributes: ['obsInterdicao', 'obsCidade'],
            where: {
                nome: {
                    [Operation.in]: [city1, city2]
                }
            }
        });

        observations.map(obs => {
            warnings.push(obs.dataValues.obsInterdicao);
            warnings.push(obs.dataValues.obsCidade);
        });

        const holidays = await Holiday.findAll({
            where: {
                city_id: {
                    [Operation.in]: [cityDep.id, cityReg.id]
                },
                [Operation.or]: [{ init: dateDep }, { init: dateReg }],
                [Operation.or]: [{ end: dateDep }, { end: dateReg }],
            }
        })

        if (holidays) {
            holidays.map(holiday => {
                if (holiday.dataValues.init === holiday.dataValues.end)
                    warnings.push(`Feriado dia ${holiday.dataValues.init}: ${holiday.dataValues.nome}`);
                else
                    warnings.push(`Feriados no dia ${holiday.dataValues.init} até o dia ${holiday.dataValues.end}: ${holiday.dataValues.nome}`);
            })
        }

    } catch (error) {
        console.log("function getWarnings error: " + error);
        return { "error": error };
    }

    return warnings;
}

function getDay(date) {

    const splitDate = date.split('/');

    const reverseDate = splitDate.reverse();

    const dateFormated = new Date(new Date().getFullYear(), parseInt(reverseDate[0]) - 1, parseInt(reverseDate[1]));

    if (auxDuration === null) {
        duration = parseInt(reverseDate[1]);
        auxDuration = duration;
    }
    else {
        duration -= parseInt(reverseDate[1]) + 1;
        if (duration < 0)
            duration *= -1;
        auxDuration = null;
    }

    return daysInPt[dateFormated.getUTCDay()];
}

const findModalImg = async (modal) => {
    const result = await Modal.findOne({
        where: {
            name: {
                [Operation.like]: `%${modal}%`
            }
        }
    });
    if(result)
        return result.imgUrl;
    return null;
}

async function formatePaths(cityDep, cityReg, dateDep, dateReg) {

    const pathsResponse = [];

    const dayDep = getDay(dateDep);
    const dayReg = getDay(dateReg);

    const findAllPaths = async (init, end, day) => {

        try {
            return await Path.findAll({
                where: {
                    initCidade: init,
                    endCidade: end,
                    dia: { [Operation.like]: `%${day}%` },
                }
            })
        } catch (error) {
            console.log("function findAllPaths error: " + error);
            return { "error": error };
        }
    }

    const findHoursDeparture = (days, day, hours) => {
        const result = [];
        var j = 0;
        for (i = 0; i < days.length; i++) {
            if (days[i] === day) {
                result[j] = hours[i];
                j++;
            }
        }
        return result;
    }

    const findWay = async (time, day, city, modal, arrival = false, pathDuration = null, cityArrival = null) => {
        if (arrival) {

            pathDuration = pathDuration.split(":");

            time = time.split(":");

            var daysTravelling = 0;

            var hoursArrival = parseInt(time[0]) + parseInt(pathDuration[0]);
            var minutesArrival = parseInt(time[1]) + parseInt(pathDuration[1]);

            while (minutesArrival >= 60) {
                minutesArrival -= 60;
                hoursArrival += 1;
            }

            while (hoursArrival >= 24) {
                hoursArrival -= 24;
                daysTravelling += 1;
            }

            var timeArrival = hoursArrival >= 0 && hoursArrival <= 9 ? "0" + hoursArrival : hoursArrival;
            timeArrival = minutesArrival >= 0 && minutesArrival <= 9 ? `${timeArrival}:0${minutesArrival}` : `${timeArrival}:${minutesArrival}`;

            var dayPath = day;

            if (daysTravelling > 0) {
                var j = daysInPt.indexOf(day);

                for (i = 0; i <= daysTravelling; i++) {
                    if (j > 6)
                        j = 0;
                    dayPath = daysInPt[j];
                    j++;
                }
            }

            return {
                time: timeArrival,
                day: dayPath,
                city: cityArrival,
                modal: modal
            }
        }
        return {
            time: time,
            day: day,
            city: city,
            modal: modal
        }
    }

    const pathsGoing = await findAllPaths(cityDep, cityReg, dayDep, dateDep);
    const pathsBack = await findAllPaths(cityReg, cityDep, dayReg, dateReg);

    var index = 0;

    const waysGoing = [];
    const waysBack = [];

    await Promise.all(
        pathsGoing.map(async (path) => {

            const hoursDeparture = findHoursDeparture(path.dia, dayDep, path.hora);

            const data = {
                date: dateDep,
                mileage: path.mileage,
                cost: path.cost,
                modalImg: await findModalImg(path.modal),
                provider: path.prestNome,
                departure: await findWay(hoursDeparture[index], dayDep, path.initCidade, path.modal),
                arrival: await findWay(hoursDeparture[index], dayDep, path.initCidade, path.modal, true, path.duration, path.endCidade),
            }

            index += 1;

            waysGoing.push({
                going: data
            });
        })
    );

    index = 0;

    await Promise.all(
        pathsBack.map(async (path) => {

            const hoursDeparture = findHoursDeparture(path.dia, dayReg, path.hora);

            const data = {
                date: dateReg,
                mileage: path.mileage,
                cost: path.cost,
                modalImg: await findModalImg(path.modal),
                provider: path.prestNome,
                departure: await findWay(hoursDeparture[index], dayReg, path.initCidade, path.modal),
                arrival: await findWay(hoursDeparture[index], dayReg, path.initCidade, path.modal, true, path.duration, path.endCidade),
            }

            index += 1;

            waysBack.push({
                back: data
            });
        })
    );

    for (i = 0; i < waysGoing.length; i++) {
        pathsResponse.push({
            totalCost: waysGoing[i].going.cost + waysBack[i].back.cost,
            totalMileage: waysGoing[i].going.mileage + waysBack[i].back.mileage,
            going: waysGoing[i].going,
            back: waysBack[i].back
        })
    }

    return pathsResponse;
}

module.exports = {

    async index(req, res) {

        const object = [...req.body];

        const data = await Promise.all(
            object.map(async obj => {
                return {
                    cityDeparture: obj.cityDeparture,
                    dateDeparture: obj.dateDeparture,
                    warnings: await getWarnings(obj.cityDeparture, obj.cityRegress, obj.dateDeparture, obj.dateRegress),
                    cityRegress: obj.cityRegress,
                    dateRegress: obj.dateRegress,
                    paths: await formatePaths(obj.cityDeparture, obj.cityRegress, obj.dateDeparture, obj.dateRegress),
                    duration: duration
                }
            })
        );

        //query might be: cost or null
        const sortedData = sortPaths(data, req.query.sort)

        return res.status(200).send(sortedData);
    }
}