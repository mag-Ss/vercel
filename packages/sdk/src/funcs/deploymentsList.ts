/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { VercelCore } from "../core.js";
import { dlv } from "../lib/dlv.js";
import { encodeFormQuery } from "../lib/encodings.js";
import * as M from "../lib/matchers.js";
import { safeParse } from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/httpclienterrors.js";
import { SDKError } from "../models/errors/sdkerror.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import {
  GetDeploymentsRequest,
  GetDeploymentsRequest$outboundSchema,
  GetDeploymentsResponse,
  GetDeploymentsResponse$inboundSchema,
} from "../models/operations/getdeployments.js";
import { Result } from "../types/fp.js";
import {
  createPageIterator,
  haltIterator,
  PageIterator,
  Paginator,
} from "../types/operations.js";

/**
 * List deployments
 *
 * @remarks
 * List deployments under the authenticated user or team. If a deployment hasn't finished uploading (is incomplete), the `url` property will have a value of `null`.
 */
export async function deploymentsList(
  client: VercelCore,
  request: GetDeploymentsRequest,
  options?: RequestOptions,
): Promise<
  PageIterator<
    Result<
      GetDeploymentsResponse,
      | SDKError
      | SDKValidationError
      | UnexpectedClientError
      | InvalidRequestError
      | RequestAbortedError
      | RequestTimeoutError
      | ConnectionError
    >
  >
> {
  const input = request;

  const parsed = safeParse(
    input,
    (value) => GetDeploymentsRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return haltIterator(parsed);
  }
  const payload = parsed.value;
  const body = null;

  const path = pathToFunc("/v6/deployments")();

  const query = encodeFormQuery({
    "app": payload.app,
    "from": payload.from,
    "limit": payload.limit,
    "projectId": payload.projectId,
    "rollbackCandidate": payload.rollbackCandidate,
    "since": payload.since,
    "slug": payload.slug,
    "state": payload.state,
    "target": payload.target,
    "teamId": payload.teamId,
    "to": payload.to,
    "until": payload.until,
    "users": payload.users,
  });

  const headers = new Headers({
    Accept: "application/json",
  });

  const secConfig = await extractSecurity(client._options.bearerToken);
  const securityInput = secConfig == null ? {} : { bearerToken: secConfig };
  const context = {
    operationID: "getDeployments",
    oAuth2Scopes: [],
    securitySource: client._options.bearerToken,
  };
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    path: path,
    headers: headers,
    query: query,
    body: body,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return haltIterator(requestRes);
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "404", "422", "4XX", "5XX"],
    retryConfig: options?.retries
      || client._options.retryConfig,
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
  });
  if (!doResult.ok) {
    return haltIterator(doResult);
  }
  const response = doResult.value;

  const responseFields = {
    HttpMeta: { Response: response, Request: req },
  };

  const [result, raw] = await M.match<
    GetDeploymentsResponse,
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >(
    M.json(200, GetDeploymentsResponse$inboundSchema, { key: "Result" }),
    M.fail([400, 401, 403, 404, 422, "4XX", "5XX"]),
  )(response, { extraFields: responseFields });
  if (!result.ok) {
    return haltIterator(result);
  }

  const nextFunc = (
    responseData: unknown,
  ): Paginator<
    Result<
      GetDeploymentsResponse,
      | SDKError
      | SDKValidationError
      | UnexpectedClientError
      | InvalidRequestError
      | RequestAbortedError
      | RequestTimeoutError
      | ConnectionError
    >
  > => {
    const nextCursor = dlv(responseData, "pagination.since");
    if (nextCursor == null) {
      return () => null;
    }

    return () =>
      deploymentsList(
        client,
        {
          ...input,
          since: nextCursor,
        },
        options,
      );
  };

  const page = { ...result, next: nextFunc(raw) };
  return { ...page, ...createPageIterator(page, (v) => !v.ok) };
}
