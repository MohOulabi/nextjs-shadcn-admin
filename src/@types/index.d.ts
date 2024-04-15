type LocaleParams = {
  params: {
    locale: string;
  };
};

type NextPageProps = {
  searchParams?: Record<string, string | string[]>;
  params: {
    locale: Languages;
  };
};

type NextPage<T = object> = (
  props: NextPageProps & T
) => React.ReactElement | Promise<React.ReactElement> | null;

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>;

type ErrorFileProps = {
  reset: () => void;
  error: Error & { digest?: string };
};

type TranslationKey = MessageKeys<IntlMessages, any>;
