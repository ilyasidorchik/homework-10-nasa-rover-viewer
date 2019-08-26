// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import SelectSol from '../SelectSol/';
import RoverPhotos from '../RoverPhotos';
import { changeSol, fetchPhotosRequest, getRoverPhotos, getSol } from '../../modules/RoverPhotos';
import rovers from '../../rovers';
import styles from './RoversViewer.module.css';

class RoversViewer extends PureComponent {
  componentDidMount() {
    const { sol, fetchPhotos } = this.props;

    rovers.forEach(name => fetchPhotos({ name, sol: sol.current }));
  }

  renderRoverPhotos() {
    const { photos, sol } = this.props;

    return rovers.map(name => {
      const rover = photos[name];

      return (
        sol.current in rover &&
        rover[sol.current].length !== 0 && (
          <RoverPhotos
            key={name}
            name={name}
            photos={rover[sol.current].photos}
          />
        )
      );
    });
  }

  render() {
    const { sol, changeSol } = this.props;
    const { min: minSol, max: maxSol, current: selectedSol } = sol;

    return (
      <div className={styles.root}>
        <SelectSol {...{ minSol, maxSol, selectedSol, changeSol }} />
        <div className={styles.rovers}>{this.renderRoverPhotos()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sol: getSol(state),
  photos: getRoverPhotos(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeSol: sol => dispatch(changeSol(sol)),
    fetchPhotos: action => dispatch(fetchPhotosRequest(action))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoversViewer);