import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { IonicModule, NavController } from '@ionic/angular';

//import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
})
export class OvernightPage implements OnInit {
  saved:boolean = false;
  startOverDate:Date = new Date();
  endOverDate:Date = new Date();
  overnightList: OvernightSleepData[];
  currOvernightList: OvernightSleepData;
  jsonmy:string = JSON.stringify(this.startOverDate);

  constructor(private sleepservice:SleepService, private navCtrl:NavController) {
    Storage.get({key:'jsonmy'}).then( name => {

      let myOb = JSON.parse(this.jsonmy);
      if(name.value){
        console.log('GET---' + name.value);
        myOb = name.value;
        this.saved=true;
      }

    });
   }

  ngOnInit() {
    this.overnightList=SleepService.AllOvernightData;
    this.currOvernightList=this.overnightList[this.overnightList.length-1];
  }

  async getItem() {
		const producting = await Storage.get({  key:  'something_new' });
		console.log('something new: ' + producting.value)
	}

  async addOvernight(){

    //var myJson = JSON.stringify(this.startOverDate);
    // Storage.set({key:'startOverDate', value:this.jsonmy}).then(() => {
    //   this.saved = true;
    // });

    console.log('adding data');
    console.log(this.startOverDate);
    console.log(this.endOverDate);


    let overnData: OvernightSleepData;
    overnData = new OvernightSleepData(this.startOverDate, this.endOverDate);
    this.sleepservice.logOvernightData(overnData);

    const producting = await Storage.get({  key:  'something_new' });
		console.log('from overnight.page.ts something new: ' + producting.value);

  }



  // dateString():string {
  //   var newSleepStart = new Date(this.overnData.loggedAt);
	// 	return "Night of " + newSleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	// }


  goBack(){
    this.navCtrl.back();
  }

}
