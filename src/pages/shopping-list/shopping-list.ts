import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {AddShoppingPage} from '../add-shopping/add-shopping';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {ShoppingItem} from '../../models/shopping-item/shopping-item.interface';
import { COMPILER_OPTIONS } from '@angular/core/src/linker/compiler';
import {EditShoppingItemPage} from '../edit-shopping-item/edit-shopping-item';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  shoppingListRef$ = {} as FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl : NavController,
    public navParams : NavParams,
    private database : AngularFireDatabase,
    private actionSheetCtrl : ActionSheetController
  ) {
    // Pointing 'shoppingListRef' at Firebase -> 'shopping-list' node
      this.shoppingListRef$ = this.database.list('shopping-list');

      // this.shoppingListRef$.subscribe(x => console.log(x));
  }

 /*
    Display an ActionSheet that gives the following options:

    1. Edit the ShoppingItem;
    2. Delete the ShoppingItem;
    3. Cancel selection.
  */
selectShoppingItem(shoppingItem: ShoppingItem){

  this.actionSheetCtrl.create({
    title: `${shoppingItem.itemName}`,
    buttons: [
      {
        text: 'Edit',
        handler: () => {
          // Send the user to the EditShoppingItemPage and
          // pass the key as a parameter
          this.navCtrl.push(EditShoppingItemPage, {shoppingItemId: shoppingItem.$key});
        }
      },
      {
        text: 'Delete',
        role: 'destuctive',
        handler: () => {
          // Delete the current ShoppingItem
          this.shoppingListRef$.remove(shoppingItem.$key);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log("The user has selected the cancel button");
        }
      }
    ]
  }).present();
}

  navigateToAddShoppingPage() {
    // Navigate the user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }

}
