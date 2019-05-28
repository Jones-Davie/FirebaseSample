import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor( public afAuth: AngularFireAuth,
    private popoverController: PopoverController) { }

  ngOnInit() {
  }


  closePopover() {
    this.popoverController.dismiss()
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      location.reload()
    })
  }

}
