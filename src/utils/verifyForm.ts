import config from "@config";

export const verifyForm = (
  text: string,
  verifyJwt: string,
) => {
  const body = `
  <table
  class="main_div"
  style="min-height: 200px; text-align: center; width: 100%"
>
  <tr>
    <td valign="top" align="left" style="font-size: 26px; color: #000">
      <p>${text}</p>
    </td>
  </tr>
  <tr>
    <td valign="top" align="left" style="font-size: 26px">
      <a
        rel="noreferrer"
        target="_blank"
        href="${config.host}/auth/verify/${verifyJwt}"
        >verify link</a
      >
    </td>
  </tr>
</table>
  `;

  return body;
};
