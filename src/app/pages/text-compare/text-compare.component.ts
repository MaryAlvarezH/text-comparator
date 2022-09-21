import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComparisonResult, SavedComparison } from 'src/app/models/comparison';
import { ComparisonService } from 'src/app/services/comparison.service';
import { ReqStatus } from 'src/app/tools/types/global';

@Component({
  selector: 'app-text-compare',
  templateUrl: './text-compare.component.html',
  styleUrls: ['./text-compare.component.scss'],
})
export class TextCompareComponent implements OnInit {
  form: FormGroup;
  comparisonResult: ComparisonResult;
  historyResult: SavedComparison[];
  compareReqStatus: ReqStatus = ReqStatus.initial;
  historyReqStatus: ReqStatus = ReqStatus.initial;

  constructor(
    private fb: FormBuilder,
    private comparisonService: ComparisonService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text1: ['', Validators.required],
      text2: ['', Validators.required],
    });

    this.getComparisonHistory();
  }

  compareTexts() {
    this.compareReqStatus = 1;
    this.comparisonService
      .compareTexts(this.form.value.text1, this.form.value.text2)
      .subscribe(
        (resp: ComparisonResult) => {
          this.comparisonResult = resp;
          this.compareReqStatus = 2;
          this.getComparisonHistory();
        },
        (error) => {
          console.error(`[text-compare.component]: ${error}`);
          this.compareReqStatus = 3;
        }
      );
  }

  getComparisonHistory() {
    this.historyReqStatus = 1;

    this.comparisonService.getTextComparisons().subscribe(
      (resp: SavedComparison[]) => {
        this.historyResult = resp;
        this.historyReqStatus = 2;
      },
      (error) => {
        console.error(`[text-compare.component]: ${error}`);
        this.historyReqStatus = 3;
      }
    );
  }
}
