import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../services/settings.service";
import { SidebarService } from "../services/sidebar.service";

// @ts-ignore
declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService,
              private sidebarService: SidebarService) {}

  ngOnInit(): void {
    customInitFunction();
    this.sidebarService.cargarMenu();
  }

}
