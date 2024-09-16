import {
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = "Cette page n'existe pas";
    } else if (error.status === 401) {
      errorMessage = "Vous n'êtes pas autorisé à voir cela";
    } else if (error.status === 503) {
      errorMessage = 'Il semblerait que notre API soit hors service';
    } else if (error.status === 418) {
      errorMessage = '🫖';
    } else {
      errorMessage = error.data?.message || error.statusText;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Erreur inconnue';
  }

  return (
    <div
      id="error-page"
      className="flex h-screen border-0 overflow-hidden items-center justify-center"
    >
      <div className="absolute flex z-5 flex-col gap-2 items-center bg-white p-8 rounded-md shadow-lg">
        <h1 className="font-medium mb-0">
          Démo BL
        </h1>
        <p>Désolé, une erreur est survenue</p>

        <p className="text-slate-400">
          <i>{errorMessage}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
