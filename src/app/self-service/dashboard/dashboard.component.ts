import { Component, OnInit } from '@angular/core';
import { PercentPipe } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { essUrl } from '../es-url';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SelfServiceModalComponent } from '../self-service-modal/self-service-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  info = { NoEntitled: 0, DaysLeft: 0, NoUsed: 0, TotalApplicaitons: 0 };

  EmployeeTypes: { name: string, total: number }[] = [];
  data = []; // { EmployeeTypes: [], gender: [], agegroup: [], agegroupGender: [], agegroupType: [], cadre: [] };
  // data = { EmployeeTypes: [], gender: [], agegroup: [], agegroupGender: [], agegroupType: [], cadre: [] };
  pipe: any = new PercentPipe('en-US');
  empData = [];
  constructor(public http: HttpService, public dialog: MatDialog) { }

  openDialog(e, column, group, reportTitle): void {
    // {total: 31, name: "30-34", name2: "Regular"}
    console.log(e.target);

    let value1 = e.target.originalArgument;
    let title1 = reportTitle + ' : ' + e.target.originalArgument;
    if (group === '1') {
      title1 = reportTitle + ' : ' + e.target.data.name + ' and ' + e.target.data.name2;
      value1 = e.target.data.name + ';' + e.target.data.name2;
    }

    const dialogRef = this.dialog.open(SelfServiceModalComponent, {
      maxWidth: '70%',
      maxHeight: '700px',
      data: { data: this.empData, filter: column, value: value1, title: title1 }
    });
  }

  ngOnInit() {
    Swal.showLoading();
    this.http.get(essUrl.leave.summary)
    .subscribe(success => {
      this.data = success.data;
      this.EmployeeTypes = success.data;
      Swal.close();
    }, err => {
      console.log(err);
      Swal.close();
    });
  }

  customizeText = (arg: any) => {
    return arg.valueText;
  }
  customizeLabel = (point: any) => {
    return point.argumentText + ': ' + this.pipe.transform(point.percent, '1.2-2');
  }
  customizeTooltip = (arg: any) => {
    return {
      text: arg.valueText + ' - ' + this.pipe.transform(arg.percent, '1.2-2')
    };
  }
  customizeTooltip2 = (arg: any) => {
    return { text: arg.argumentText + '<br>' + arg.seriesName + ': ' + arg.valueText + '' };
  }

  customizeLabel2 = (arg: any) => {
    return arg.argumentText + '<br>' + arg.seriesName + ': ' + arg.valueText + '';
  }
}

