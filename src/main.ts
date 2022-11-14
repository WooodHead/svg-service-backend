import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";


async function main() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('SVG service with Nest js and React')
    .setDescription(`Service for storing custom SVG icons. Here you can upload icons or use other people's icons. The service allows you to conveniently sort icons and select exactly those that are needed in your project.`)
    .setVersion('1.0.0')
    .addTag('psychoduckos')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/documentation', app, document)


  await app.listen(PORT, () => {
    console.log(`Server was started on PORT: ${PORT}`)
  })
}

main()