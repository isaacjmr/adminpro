import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() leyenda: string = 'LEYENDA';
  @Input() data: number[] = [350, 450, 100];
  @Input() labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() charttype: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
