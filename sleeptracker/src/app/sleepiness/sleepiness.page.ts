import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';
import { IonicModule, NavController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  sleepinessDate = new Date();
  rating:number;
  sleepinessList:StanfordSleepinessData[];
  currSleepinessList:StanfordSleepinessData;
  static sleepinessList2:StanfordSleepinessData[];

  saved:boolean = false;
  jsonmy:string = JSON.stringify(this.sleepinessDate);


  constructor(private sleepservice:SleepService, private navCtrl:NavController) {
    // Storage.get({key:'jsonmy'}).then( name => {

    //   let myOb = JSON.parse(this.jsonmy);
    //   if(name.value){
    //     console.log('GET---' + name.value);
    //     myOb = name.value;
    //     this.saved=true;
    //   }
    // });
   }



  ngOnInit() {
    this.sleepinessList = SleepService.AllSleepinessData;
    this.currSleepinessList = this.sleepinessList[this.sleepinessList.length-1];
    
  }

  async getData(){
		const getFromstorage = await Storage.get({key: 'sleepdata'});
		JSON.parse(getFromstorage.value).forEach( (element) => 
		{
			var thetime = new Date(element.loggedAt);
			var theNumber = parseInt(element.loggedValue);
			SleepService.AllSleepinessData.push(new StanfordSleepinessData(theNumber, thetime));
		})
	}

  // async getItem() {
	// 	const producting = await Storage.get({  key:  'something_new' });
	// 	console.log('something new addsleepiness:  ->>> ' + producting.value)
	// }

  addSleepiness(){
    //this.getItem();
   // console.log('something_new - addsleepiness  ' + this.getItem());

    // Storage.set({key:'sleepinessDate', value:this.jsonmy}).then(() => {
    //   this.saved = true;
    // });

    // console.log('adding data');
    // console.log('***what im looking at **' + this.sleepinessDate);
    // console.log(this.rating);
    // if(AllSleepinessData.length == 0)
    // this.getData();

    let ssdata:StanfordSleepinessData=new StanfordSleepinessData(this.rating, this.sleepinessDate);

    this.sleepservice.logSleepinessData(ssdata);
    this.currSleepinessList = this.sleepinessList[this.sleepinessList.length-1];
    //get data
    this.sleepservice.getAllSleepinessData();
  }

  goBack(){
    this.navCtrl.back();
  }

}
