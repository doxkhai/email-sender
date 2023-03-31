export const mailerForm = (
  text: string,
  unsubscribeJwt: string,
  host: string
) => {
  const body = `
    <p>${text}</p>

    <a rel="noreferrer" target="_blank" href="${host}/auth/unsubscribe/${unsubscribeJwt}">To unsubscribe, click this link</a>
  `;

  return body;
};
