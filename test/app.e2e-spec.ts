import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        status: 'ok',
        service: 'notifyflow-api'
    });
  });

  it('/notifications (POST)', () => {
    return request(app.getHttpServer())
      .post('/notifications')
      .send({
        recipient:'test@example.com',
        subject: 'Welcome to NotifyFlow',
        message: 'Your account is ready.'
      })
      .expect(201)
      .expect((response) => {
        expect(response.body).toEqual({
        recipient:'test@example.com',
        subject: 'Welcome to NotifyFlow',
        message: 'Your account is ready.',
        id: expect.any(String),
        status: 'pending',
        createdAt: expect.any(String)
      });
    });
  });

  it('/notifications (GET) returns an empty list', () => {
    return request(app.getHttpServer())
      .get('/notifications')
      .expect(200)
      .expect([]);
  });

  it('/notifications (GET) returns a created notification', async () => {
    const created = await request(app.getHttpServer())
      .post('/notifications')
      .send({
        recipient:'test@example.com',
        subject: 'Welcome to NotifyFlow',
        message: 'Your account is ready.'
      })
      .expect(201);
      
    await request(app.getHttpServer())
      .get('/notifications')
      .expect(200)
      .expect([created.body]);
  });

  afterEach(async () => {
    await app.close();
  });
});
