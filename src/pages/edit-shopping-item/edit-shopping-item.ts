import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {ShoppingItem} from '../../models/shopping-item/shopping-item.interface';

@Component({selector: 'page-edit-shopping-item', templateUrl: 'edit-shopping-item.html'})
export class EditShoppingItemPage {

  shoppingItemRef$ : FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl : NavController,
    public navParams : NavParams,
    private database : AngularFireDatabase
  ) {
    // Capture the shopping Id as a Nav parameter
    const shoppingItemId = this.navParams.get('shoppingItemId');

    //Log out the Nav param
      // console.log(shoppingItemId);
    // Set the scope of our FireBase Object
    // equal to our selected item (based on NavParams)
    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

    // Subscribe to the object and assign the result to 'this.shoppingItem'.
    this.shoppingItemRef$.subscribe(
      shoppingItem => this.shoppingItem = shoppingItem
    );
  }

  // Update our FireBase node with new item data
  editShoppingItem(shoppingItem: ShoppingItem){
      this.shoppingItemRef$.update(shoppingItem);

  // Send the user back to the ShoppingList  page
      this.navCtrl.pop();
  }

}
