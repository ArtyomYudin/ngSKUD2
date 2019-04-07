import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '@services/dynamicscriptloader.service';
declare var streamCam: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  public ngOnInit() {
    this.loadScripts();
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('jsmpeg', 'videocanvas').then(data => {
      // Script Loaded Successfully
      streamCam();
    }).catch(error => console.log(error));
}

}
