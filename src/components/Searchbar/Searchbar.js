import React, { Component } from 'react';
import styles from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
    state = {
        searchQuery: '',
    };
   
    handleSearchChange = event => {
        this.setState({ searchQuery: event.currentTarget.value.trim() });
    };
        
    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchQuery === '') {
            toast.error('Empty request');
            return;
        }
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
    };

    render() {
        return (
            <header className={styles.searchbar}>
                <form className={styles.searchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.button}>
                        <span className={styles.label} aria-label='Search'><ImSearch />
                         </span>
                    </button>

                    <input
                        type='text'
                        name='searchbar'
                        autoComplete="off"
                        autoFocus
                        onChange={this.handleSearchChange}
                        value={this.state.searchQuery}
                        className={styles.input}
                        placeholder='Search images and photos'
                    />
                </form>
            </header>
        )
    }
}