import { Component, Input, OnInit } from '@angular/core';
import { SavedComparison } from 'src/app/models/comparison';

@Component({
  selector: 'app-comparison-history-table',
  templateUrl: './comparison-history-table.component.html',
  styleUrls: ['./comparison-history-table.component.scss'],
})
export class ComparisonHistoryTableComponent implements OnInit {
  @Input() dataSource: SavedComparison[];

  displayedColumns: string[] = [
    'date',
    'firstText',
    'secondText',
    'vowelsFisrtText',
    'vowelsSecondText',
  ];

  constructor() {}

  ngOnInit(): void {}
}
