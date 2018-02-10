import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Grid } from 'semantic-ui-react';

import { fetchMovies } from '../actions/moviesActions';

import MoviesCardList from '../components/MoviesCardList';

class HomePage extends Component {
    componentWillMount() {
        this.props.fetchMovies();
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.fetchMovies(pageNumber);
    }



    render() {
        return (
            <div>
                <h1 className="text-center page-title">Popular Movies</h1>
                <div className="row">
                    <div className="col-md-12">
                        <MoviesCardList movies={this.props.movies} cols={6}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <Pagination
                            activePage={this.props.page}
                            itemsCountPerPage={20}
                            totalItemsCount={this.props.totalResults}
                            pageRangeDisplayed={5}
                            innerClass="pagination"
                            itemClass="page-item"
                            linkClass="page-link"
                            disabledClass="disabled"
                            activeClass="active"
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { movies, loading, page, totalResults }  = state.moviesStore;
    return { movies, loading, page, totalResults }
}

export default connect(mapStateToProps, { fetchMovies })(HomePage);