
import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { recruitmentUrl } from '../recruitment-url';
import swal from 'sweetalert2';
@Component({
  selector: 'app-recruitmentstage',
  templateUrl: './recruitmentstage.component.html',
  styleUrls: ['./recruitmentstage.component.scss']
})
export class RecruitmentstageComponent implements OnInit {
    
	displayedColumns: string[] = ['RequirementStage','RecruitmentProcessID'];
	data = [];
    obj={ RequirementStage : null,RecruitmentProcessID : null };
    displayForm = false;
    operation = "Add";
	title="Recruitment Stage";
	parent="Recruitment";
	
    constructor(protected http: HttpService) {
		this.loadItem = this.loadItem.bind(this);
	}
  
    ngOnInit() {
      this.http.get(recruitmentUrl.recruitmentstage.list)
        .subscribe(res => {
		  this.data = res.data;
        }, err =>
        { console.log(err) });
		
    }
	
    showForm()
    {
      this.displayForm = true;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  
    hideForm(){this.displayForm = false;}

    addItem() {
      this.resetForm();
      this.showForm();
    }
  
    processForm()
    {
      let url = recruitmentUrl.recruitmentstage.add;
      if(this.operation=="Update")
        url = recruitmentUrl.recruitmentstage.update;
      this.save(url);
    }
  
    save(url)
    {
      this.http.post(url,this.obj)
        .subscribe(res => {
          this.data= res.data;
          swal.fire("Process Complete", res.message,'success');
          this.resetForm();
        }, err =>
        {
          console.log(err);
          swal.fire("Process Unsuccessful", err.error.message,'error');
        });

    }
  
    loadItem(id)
    {
      this.obj = this.data.find(item => item.id == id.row.data.id);
      this.operation ="Update";
      this.showForm();
    }
  
    resetForm()
    {
      this.obj = { RequirementStage : null,RecruitmentProcessID : null };
      this.hideForm();
      this.operation="Add";
    }
  }
