import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'spaceXT';
  allData = [];
  allDataUrl;
  filteredData: any[] = [];

  ngOnInit() {
    this.allDataUrl = `https://api.spacexdata.com/v3/launches?limit=100`;
    fetch(this.allDataUrl)
      .then((res) => res.json())
      .then((data) => this.allData.push(...data))
      .then(() => {
        this.filteredData = this.filteredData.length > 0 ? this.filteredData : this.allData; 
      })
      .catch((error) => {
        throw error;
      });
  }

  getYearData(chosenYear) {
    this.filteredData = this.allData.filter(
      (data) => data.launch_year == chosenYear
    );
    if(this.filteredData.length<=0){
      alert(`No data found in ${chosenYear}`);
      this.filteredData = this.allData;
    }
  }

  getLaunchStatus(status) {
    this.filteredData = this.allData.filter((data) => data.launch_success == status);
  }

  getlandingStatus(status) {
    this.filteredData = this.allData.filter(
      (data) => data.rocket.first_stage.cores[0].land_success == status
    );
  }
}
