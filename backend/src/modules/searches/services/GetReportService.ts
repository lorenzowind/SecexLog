import { injectable, inject } from 'tsyringe';
import PDFDocument from 'pdfkit';
import crypto from 'crypto';
import fs from 'fs';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { PathResultsSection } from '../dtos/ISearchResponseDTO';

function getImageUrl(fileName: string): string | null {
  if (!fileName) {
    return null;
  }

  switch (uploadConfig.driver) {
    case 'disk':
      return `${process.env.APP_API_URL}/files/${fileName}`;
    case 's3':
      return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${fileName}`;
    default:
      return null;
  }
}

function formatPrice(value: number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

@injectable()
class GetReportService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(data: PathResultsSection): Promise<any> {
    const pdfDocument = new PDFDocument({ compress: false });

    const fileHash = crypto.randomBytes(10).toString('hex');

    pdfDocument.pipe(fs.createWriteStream(`tmp/${fileHash}-SearchReport.pdf`));

    pdfDocument.image(
      'src/assets/image-top-pdf.png',
      (pdfDocument.page.width - pdfDocument.page.width / 4) / 2,
      20,
      {
        height: 40,
      },
    );

    pdfDocument.fontSize(20).font('Helvetica-Bold').text('Detalhes da Viagem');

    for (let i = 0; i < data.paths.length; i += 1) {
      pdfDocument.moveDown();

      pdfDocument
        .fontSize(16)
        .font('Helvetica-Bold')
        .text(
          `${data.paths[i].path_data.origin_city_name} - ${data.paths[i].path_data.destination_city_name}`,
        );

      pdfDocument
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Partida: ', {
          continued: true,
        })
        .font('Helvetica')
        .text(
          `${data.paths[i].selected_period.selected_date} às ${data.paths[i].selected_period.selected_initial_time}`,
        );

      pdfDocument
        .font('Helvetica-Bold')
        .text('Chegada: ', {
          continued: true,
        })
        .font('Helvetica')
        .text(
          `${data.paths[i].selected_period.selected_date} às ${data.paths[i].selected_period.selected_final_time}`,
        );

      pdfDocument
        .font('Helvetica-Bold')
        .text('Duração da viagem: ', {
          continued: true,
        })
        .font('Helvetica')
        .text(
          `${(data.paths[i].path_data.duration / 60).toFixed(0)} h ${
            data.paths[i].path_data.duration % 60
          } m`,
        );

      pdfDocument
        .font('Helvetica-Bold')
        .text('Custo: ', {
          continued: true,
        })
        .font('Helvetica')
        .text(`${formatPrice(data.paths[i].path_data.cost)}`);

      pdfDocument
        .font('Helvetica-Bold')
        .text('Prestador de serviço: ', {
          continued: true,
        })
        .font('Helvetica')
        .text(
          `${data.paths[i].path_data.modal_name} - ${data.paths[i].path_data.provider_name}`,
        );

      pdfDocument
        .font('Helvetica-Bold')
        .text('Local de embarque: ', {
          continued: true,
        })
        .font('Helvetica')
        .text(`${data.paths[i].path_data.boarding_place}`);

      pdfDocument
        .font('Helvetica-Bold')
        .text('Local de desembarque: ', {
          continued: true,
        })
        .font('Helvetica')
        .text(`${data.paths[i].path_data.departure_place}`);
    }

    if (data.observations.length) {
      pdfDocument
        .moveDown()
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Informações adicionais: ', {
          continued: true,
        })
        .font('Helvetica')
        .text(`${data.observations.join(', ')}`);
    }

    pdfDocument.end();

    const fileName = await this.storageProvider.saveFile(
      `${fileHash}-SearchReport.pdf`,
    );

    return getImageUrl(fileName);
  }
}

export default GetReportService;
