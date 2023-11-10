import { getLocale } from '../../utils/get-locale';

import LoginForm from './widgets/login-form';

const LoginPage = async () => {
  const locale = await getLocale();
  const loginLocale = locale.login;

  return (
    <main className="flex h-full bg-gray-50">
      <section className="flex-1 flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col justify-center max-w-xs pt-9">
          <h1 className="mb-4 font-light text-5xl">{loginLocale["form.title"]}</h1>
          <LoginForm loginLocale={loginLocale} />
        </div>
      </section>
      <div className="relative flex-1 bg-gradient-to-bl from-blue-100 to-black-100 hidden lg:block" />
    </main>
  );
}

export default LoginPage;