export type NetlifyFormResult =
  | { status: "submitted" }
  | { status: "local-preview" };

export async function submitNetlifyForm(
  formName: string,
  values: Record<string, string>,
): Promise<NetlifyFormResult> {
  const hostname = window.location.hostname;
  const isLocalhost =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname === "::1" ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);
  if (isLocalhost) {
    return { status: "local-preview" };
  }

  const body = new URLSearchParams({
    "form-name": formName,
    ...values,
  });
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Netlify Forms merespons dengan status ${response.status}.`);
  }

  return { status: "submitted" };
}