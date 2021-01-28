import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

@injectable()
class SendReportService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(filepath: string, email: string): Promise<any> {
    const sendReportTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'send_report.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: 'usuário SecexLog',
        email,
      },
      subject: '[SecexLog] Relatório detalhado de viagem',
      templateData: {
        file: sendReportTemplate,
        variables: {
          name: 'usuário SecexLog',
          link: filepath,
        },
      },
    });
  }
}

export default SendReportService;
