import config from "@config";

export const mailerForm = (text: string, unsubscribeJwt: string) => {
  const body = `
  <table class="main_div" style="min-height: 200px; text-align: center; width: 100%">
    <tr>
        <td valign="top" align="left" style="font-size: 15px; color: #000"><div>${text}</div></td>
    </tr>
    <tr>
        <td valign="bottom" style="font-size: 9px;">
            <a
            rel="noreferrer"
            target="_blank"
            href="${config.host}/auth/unsubscribe/${unsubscribeJwt}"
            >To unsubscribe, click this link</a
          >
        </td>
    </tr>
</table>
  `;

  return body;
};
