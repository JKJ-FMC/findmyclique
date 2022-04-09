import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './SingleGroup.css';

const SingleUserCard = ({ selectedUser }) => {
  return (
    <Card sx={{ width: 375, height: 520 }}>
      <CardMedia
        component="img"
        sx={{ width: '100%', height: 320, objectFit: 'cover' }}
        image={selectedUser.imageUrl}
        alt={selectedUser.imageUrl}
      />
      <CardContent className="card-content">
        <div className="card-content-item">
          <h2
            className="card-content-title"
            style={{ textTransform: 'capitalize' }}
          >
            hello, my name is {selectedUser.firstName}
          </h2>
        </div>
        <div className="card-content-item">
          <h4>bio: {selectedUser.bio}</h4>
        </div>
        <div className="card-content-item">
          <h4>job: {selectedUser.job}</h4>
        </div>
        <div className="card-content-item">
          <h4>email: {selectedUser.email}</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleUserCard;
