import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() etiquetas: Array<string> = [];
  @Input() datos: Array<string> = [];
  @Input() tipo: string = ''; 
  @Input() leyenda: string = '';


  constructor() { }

  ngOnInit() {
  }

}
