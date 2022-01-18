import { QueryRunner } from 'typeorm'

const qr = {
  manager: {},
} as QueryRunner

export class ConnectionMock {
  createQueryRunner(): QueryRunner {
    return qr
  }

  transaction = jest.fn()
  manager = jest.fn()
}
