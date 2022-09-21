export class SavedComparison {
  id: number;
  userID: number;
  date: string;
  firstText: string;
  secondText: string;
  vowelsFisrtText: string;
  vowelsSecondText: string;
  transformationDistance: number;
}

export class ComparisonResult {
  htmlDiff: string;
  transformationDistance: number;
}
