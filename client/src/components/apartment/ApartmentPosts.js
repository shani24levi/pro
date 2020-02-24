import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from '../posts/PostForm';
import PostFeed from '../posts/PostFeed';
import Spinner from '../common/Spinner';
import { getPostsByApartmentId } from '../../actions/postActions';

class ApartmentPosts extends Component {

  componentDidMount() {
    this.props.getPostsByApartmentId(this.props.apartment._id);
  }

  render() {
    const { apartment } = this.props;
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm apartment={apartment} />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ApartmentPosts.propTypes = {
  getPostsByApartmentId: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPostsByApartmentId })(ApartmentPosts);