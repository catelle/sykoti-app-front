import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './StoryDetails.css';
import styled from 'styled-components';
import { auth, db } from '../../contexts/firebaseSetup';
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';





const Paragraph = styled.p`
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 1rem;
`;

const Heading = styled.h2`
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'historyCollection', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStory(docSnap.data());
          console.log('Story fetched:', docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching story:', error);
        setError('Error fetching story');
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id, refresh]);

  const handleLike = async () => {
    const userId = auth.currentUser?.uid;
  
    if (!userId) {
      console.error('User not authenticated');
      return;
    }
  
    try {
      const docRef = doc(db, 'historyCollection', id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userHasLiked = data.likes && data.likes[userId];
  
        if (userHasLiked) {
          // User has already liked, so we need to unlike
          await updateDoc(docRef, {
            [`likes.${userId}`]: deleteField(), // Remove user's like
            likeCount: (data.likeCount || 1) - 1, // Decrease like count
          });
  
          console.log('Testimony unliked successfully');
        } else {
          // User has not liked yet, so we need to like
          await updateDoc(docRef, {
            [`likes.${userId}`]: true, // Add user's like
            likeCount: (data.likeCount || 0) + 1, // Increase like count
          });
  
          console.log('Testimony liked successfully');
        }
  
        setRefresh(!refresh); // Update the story without reloading the page
      } else {
        console.log('Testimony does not exist');
      }
    } catch (error) {
      console.error('Error toggling like on testimony:', error);
    }
  };
  
  
  const handleVote = async () => {
    const userId = auth.currentUser?.uid;
  
    if (!userId) {
      console.error('User not authenticated');
      return;
    }
  
    try {
      const docRef = doc(db, 'historyCollection', id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userHasVoted = data.votes && data.votes[userId];
  
        if (userHasVoted) {
          // User has already voted, so we need to unvote
          await updateDoc(docRef, {
            [`votes.${userId}`]: deleteField(), // Remove user's vote
            voteCount: (data.voteCount || 1) - 1, // Decrease vote count
          });
  
          console.log('Testimony unvoted successfully');
        } else {
          // User has not voted yet, so we need to vote
          await updateDoc(docRef, {
            [`votes.${userId}`]: true, // Add user's vote
            voteCount: (data.voteCount || 0) + 1, // Increase vote count
          });
  
          console.log('Testimony voted successfully');
        }
  
        setRefresh(!refresh); // Update the story without reloading the page
      } else {
        console.log('Testimony does not exist');
      }
    } catch (error) {
      console.error('Error toggling vote on testimony:', error);
    }
  };
  
  

  const handleComment = () => {
    // Implement comment functionality
  };

  if (loading) {
    return <div>Loading story...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!story) {
    return <div>Story not found</div>; 
  }

  const renderLikes = () => {
    if (story.likes) {
      return Object.values(story.likes).map((value, index) => (
        <span key={index}>{value}</span>
      ));
    }
    return 'No likes yet';
  };
  const renderVotes = () => {
    if (story.votes) {
      return Object.values(story.votes).map((value, index) => (
        <span key={index}>{value}</span>
      ));
    }
    return 'No votes yet';
  };

  return (
    <div className="story-detail">
      <h1>{story.title}</h1>
      <div className="interaction-buttons">
      <button onClick={handleLike} className="like-btn">
        <ion-icon name="heart"></ion-icon> 
        ({story.likeCount || 0}) Likes
      </button>
      <button onClick={handleVote} className="vote-btn">
        <ion-icon name="thumbs-up"></ion-icon> 
        ({story.voteCount || 0}) Votes
      </button>
    </div>
      <div className="story-info">
        <p><strong>Date:</strong> {story.Date}</p>
        {/* <p><strong>Platform:</strong> {story.platform}</p> */}
        <p><strong>Category:</strong> {story.storyCat}</p>
      </div>
      <img src={story.imageuri} alt={story.title} className="story-image" />
     
      <div className="story-content">
      <Paragraph>{story.introduction}</Paragraph>
      <Paragraph>{story.développement}</Paragraph>  
      <Paragraph>{story.conclusion}</Paragraph>
      <Paragraph>{story.Autor}</Paragraph>
      
      </div>
      
    </div>
  );
};

export default StoryDetails;
