import { getTranslations } from 'next-intl/server';
import { Env } from '@/libs/Env';
import { Sponsors } from './Sponsors';

export const Hello = async () => {
  const t = await getTranslations('Dashboard');

  // Only use Clerk if it's configured
  let user = null;
  if (Env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    try {
      const { currentUser } = await import('@clerk/nextjs/server');
      user = await currentUser();
    } catch (error) {
      console.warn('Clerk not available:', error);
    }
  }

  return (
    <>
      <p>
        {`👋 `}
        {t('hello_message', { email: user?.primaryEmailAddress?.emailAddress ?? '' })}
      </p>
      <p>
        {t.rich('alternative_message', {
          url: () => (
            <a
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
            >
              Next.js Boilerplate SaaS
            </a>
          ),
        })}
      </p>
      <Sponsors />
    </>
  );
};
