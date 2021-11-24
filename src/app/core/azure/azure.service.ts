import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BlockBlobClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { environment } from "environments/environment";

// const account = 'testingangular';
// // const accountKey = 'fhVKU0JVv/Rpzwa6bfO/PQQj+R9qQ1Liy8CwluftfhPzemy4aBItdEw9o0J1vAvSnUpfFO39Zw7Eccmg3r+XSg==';
// const containerName = 'pictures';

@Injectable({ providedIn: "root" })
export class AzureService {
 
  async uploadFile(file: any, filename: any): Promise<{
      response,
      uuidFileName
  }> {
    const extension = '.' + filename.split('.').pop();
    const uuidFileName = this.generateUUID();
    const cn = this.getConnectionURL( uuidFileName + extension);
    const blobBlockClient = new BlockBlobClient(cn);
    const res = await blobBlockClient.uploadBrowserData(file);
    return { response: res, uuidFileName: uuidFileName + extension};
  }

  getConnectionURL(resourceName: any): string {
    const base = this.getResourceUrl(resourceName);
    const sas = environment.azureSas;
    return `${base}?${sas}`;
  }

  getResourceUrl(resourceName: any): string {
    return `https://${environment.azureAccountName}.blob.core.windows.net/${environment.azureContaineName}/${resourceName}`;
  }


  getResourceUrlComplete(resourceName) {
      return this.getResourceUrl(resourceName) +'?' + environment.azureSas;
  }

  generateUUID(): any {
    var d = new Date().getTime();
    const time = d;

    var d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return (
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }) +
      "-" +
      String(time)
    );
  }
}
