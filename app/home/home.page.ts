import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../components/popover/popover.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  value = 0

  constructor(
    public afAuth: AngularFireAuth,
    private popoverController: PopoverController) { 
    
    }


  async openMenu( ev: Event) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      componentProps: {
        custom_id: this.value
      },
    })
    popover.present()
  }

}
