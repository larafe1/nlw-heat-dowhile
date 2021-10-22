import { serverHttp } from './app';

serverHttp.listen(4000, () => {
  console.log('\nServer is running at http://localhost:4000');
});
