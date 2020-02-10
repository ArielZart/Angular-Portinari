import { Component } from '@angular/core';

import { PoMenuItem, PoNavbarItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Appname = "Projeto Angular-Portinari";

  readonly itensMenu = [{
    label: "Inicio",
    link: "/"
  },
  {
    label: "Empresas",
    link: "/empresas"
  },
  {
    label: "Produtos",
    link: "/produtos"
  },
  {
    label: "Gerenciar",
    link: "/gerenciar"
  }]

}
