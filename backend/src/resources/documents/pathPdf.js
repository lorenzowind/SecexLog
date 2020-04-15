module.exports = (data) => {
    return `
    <!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Detalhes da Viagem</title>
    <style>
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica';
            color: #8c8c8c;
        }

        h3 {
            color: #555;
        }

        a {
            color: #bdbdbd;
        }

        table {
            width: 100%;
        }

        .item {
            padding-bottom: 15px;
        }

        #imgsecex {
            margin: 10px;
            padding-right: 25px;
            border-right: 2px solid #8c8c8c;
        }
    </style>
</head>

<body>
    <div class="invoice-box">
        <table cellspacing=0>
            <thead>
                <tr>
                    <th colspan="2">
                        <img src="https://i.ibb.co/P6WT2Xz/fluxo-SECEXv2.png" alt="Logo Secex" style="width: 200px;"
                            id="imgsecex">
                        <img src="https://i.ibb.co/4P5S3BR/tce.png" alt="Logo TCE" style="width: 60px;" id="imgtce">
                    </th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">
                        <h2>Detalhes da Viagem</h2>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <h3>${data.cityDeparture} - ${data.cityRegress}</h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Partida</b>: ${data.going.date} às ${data.going.departure.time}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Chegada</b>: ${data.going.arrival.day} às ${data.going.arrival.time}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Duração da Viagem</b>: ${data.going.places.duration}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Prestador de Serviço</b>: ${data.going.departure.modal} - ${data.going.provider.name}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Local de embarque</b>: ${data.going.places.departure}
                        <table style="padding-left: 60px;">
                            <tr>
                                <td>Telefone: ${data.going.provider.number}</td>
                            </tr>
                            <tr>
                                <td>Email: <a href="#">${data.going.provider.email}</a> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Local de desembarque</b>: ${data.going.places.arrival}
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        Informações adicionais: ${data.warnings}
                    </td>
                </tr>
                <!-- 
                    TRAJETO DE VOLTA
                -->
                <tr>
                    <td colspan="2">
                        <h3>${data.cityRegress} - ${data.cityDeparture}</h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Partida</b>: ${data.back.date} às ${data.back.departure.time}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Chegada</b>: ${data.back.arrival.day} às ${data.back.arrival.time}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Duração da Viagem</b>: ${data.back.places.duration}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Prestador de Serviço</b>: ${data.back.departure.modal} - ${data.back.provider.name}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Local de embarque</b>: ${data.back.places.departure}
                        <table style="padding-left: 60px;">
                            <tr>
                                <td>Telefone: ${data.back.provider.number}</td>
                            </tr>
                            <tr>
                                <td>Email: <a href="#">${data.back.provider.email}</a> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="item">
                        <b>Local de desembarque</b>: ${data.back.places.arrival}
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        Informações adicionais: ${data.warnings}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
    `
}