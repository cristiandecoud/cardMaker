import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Account } from "../interfaces/auth.interface";

const initialState: Account = {
	id: '',
  username: '',
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
	withComputed(({username}) => ({
	})),
	withMethods( store => ({
		setAccount( data: Account ) {
			console.log(data);
			console.log(store.username())
			patchState( store, state => ({...data, isAuthenticated: true}));
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