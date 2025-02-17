import React from 'react';

const SocialHub = () => {
  const dummyPosts = [
    { id: 1, user: 'User1', content: 'Feeling productive today!' },
    { id: 2, user: 'User2', content: 'Struggling a bit, but pushing through.' }
  ];

  return (
    <div>
      <h2>Community Forum</h2>
      {dummyPosts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <strong>{post.user}</strong>
          <p>{post.content}</p>
        </div>
      ))}
      {/* Accountability partners and group challenges can be added */}
    </div>
  );
};

export default SocialHub;
