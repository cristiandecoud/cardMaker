import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
// import { Account } from "../interfaces/auth.interface";
import { computed } from "@angular/core";

type Account = {
	id: string;
  username: string;
  role: 'Admin' | 'User';
  darkMode: boolean;
  name: {
    firstname: string;
    lastname: string;
  },
	token: string;
  isAuthenticated: boolean;
}

const initialState: Account = {
	id: '',
  username: 'initial',
  role: 'User',
  darkMode: false,
  name: {
    firstname: '',
    lastname: ''
  },
  token: '',
	isAuthenticated: false
}

export const AuthStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	// withComputed(({username}) => ({
	// })),
	withMethods( store => ({
		setAccount( data: Account ) {
			console.log(data);
			console.log(store.username())
			patchState( store, state => ({...data}));
			console.log(store.username());
		},
		clean() {
			patchState(store, state => ({...initialState}));
		},
		refreshAccount( data: Partial<Account> ) {
			patchState(store, state => ({...state, ...data}));
		}
	}))
)