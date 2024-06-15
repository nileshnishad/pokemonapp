
import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({ type , count }) => {
  const getSkeletonType = () => {
    const skeletonArray = Array.from({ length: count });

    switch (type) {
        case 'card':
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4">
                {skeletonArray.map((_, index) => (
                  <div key={index} className="animate-pulse flex flex-col items-center p-4 bg-white rounded-lg shadow-md m-2" style={{ minWidth: "150px", height: "200px" }}>
                    <div className="bg-gray-300 rounded-lg h-24 w-full mb-4"></div>
                    <div className="w-full space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            );
      case 'table':
        return skeletonArray.map((_, index) => (
          <div key={index} className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        ));
      case 'text':
        return skeletonArray.map((_, index) => (
          <div key={index} className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ));
      default:
        return skeletonArray.map((_, index) => (
          <div key={index} className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        ));
    }
  };

  return <div className="skeleton-container">{getSkeletonType()}</div>;
};

Skeleton.propTypes = {
  type: PropTypes.string,
};

Skeleton.defaultProps = {
  type: 'text',
};

export default Skeleton;
