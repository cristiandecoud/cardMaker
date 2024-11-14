import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Account } from "../interfaces/auth.interface";
import { computed } from "@angular/core";

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
}

export const AuthStore = signalStore(
	{providedIn: 'root'},
	withState(initialState),
	withComputed(({username}) => ({
		isAuthenticated: computed(() => Boolean(username))
	})),
	withMethods( store => ({
		setAccount( data: Account ) {
			patchState( store, (state) => ({...data}))
		},
		clean() {
			patchState(store, state => ({...initialState}))
		},
		refreshAccount( data: Partial<Account> ) {
			patchState(store, state => ({...state, ...data}))
		}
	}))
)