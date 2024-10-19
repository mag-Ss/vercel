/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type GetEdgeConfigItemsRequest = {
  edgeConfigId: string;
  /**
   * The Team identifier to perform the request on behalf of.
   */
  teamId?: string | undefined;
  /**
   * The Team slug to perform the request on behalf of.
   */
  slug?: string | undefined;
};

/** @internal */
export const GetEdgeConfigItemsRequest$inboundSchema: z.ZodType<
  GetEdgeConfigItemsRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  edgeConfigId: z.string(),
  teamId: z.string().optional(),
  slug: z.string().optional(),
});

/** @internal */
export type GetEdgeConfigItemsRequest$Outbound = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

/** @internal */
export const GetEdgeConfigItemsRequest$outboundSchema: z.ZodType<
  GetEdgeConfigItemsRequest$Outbound,
  z.ZodTypeDef,
  GetEdgeConfigItemsRequest
> = z.object({
  edgeConfigId: z.string(),
  teamId: z.string().optional(),
  slug: z.string().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetEdgeConfigItemsRequest$ {
  /** @deprecated use `GetEdgeConfigItemsRequest$inboundSchema` instead. */
  export const inboundSchema = GetEdgeConfigItemsRequest$inboundSchema;
  /** @deprecated use `GetEdgeConfigItemsRequest$outboundSchema` instead. */
  export const outboundSchema = GetEdgeConfigItemsRequest$outboundSchema;
  /** @deprecated use `GetEdgeConfigItemsRequest$Outbound` instead. */
  export type Outbound = GetEdgeConfigItemsRequest$Outbound;
}
