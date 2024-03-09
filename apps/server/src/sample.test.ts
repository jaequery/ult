import { createMock } from 'ts-auto-mock';
import { AppModule } from './app.module';
interface testingX {
  testing: boolean;
}
describe('testing', () => {
  const testing: testingX = createMock<testingX>({ testing: true });
  it('should pass', () => {
    expect(true).toBe(true);
    console.log('app', AppModule);
    expect(testing.testing).toBe(true);
  });
});
