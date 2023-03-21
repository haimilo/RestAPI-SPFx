import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IRestApiProps {
  description: string;
  userDisplayName: string;
  context: WebPartContext;
  userDisplayEmail: string;
}
