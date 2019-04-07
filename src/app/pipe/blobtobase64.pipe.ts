import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'blobToBase64',
})
export class Blobtobase64Pipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any, args?: any) {
    if (value !== null) {
      const base64URL = `data:image/png;base64,${btoa(String.fromCharCode
        .apply(null, new Uint8Array((!value.data) ? value : value.data)))}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(base64URL);
    }
    return 'assets/images/avatar-male.jpg';
  }
}
