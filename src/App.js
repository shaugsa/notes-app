import React,  {useState, useMemo} from 'react'
import './styles/App.css'
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';

function App() {
 const [posts, setPosts] = useState([
   {id: 1, title: 'aa', body: 'dsfsdf'},
   {id: 2, title: 'a', body: 'sdfsdg'},
   {id: 3, title: 'ccccc', body: 'ilhjkhjk'},
 ]) 

  const [filter, setFilter] = useState({sort: '', query: ''})

 const sortedPosts = useMemo(() => {
  if (filter.sort) {
    return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
  }
  return posts;
 }, [filter.sort, posts])

 const sortedAndSearchedPosts = useMemo(() => {
  return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLocaleLowerCase()))
 }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter  
      filter={filter} 
      setFilter={setFilter}
      />
      {sortedAndSearchedPosts.length
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов'/>
        : <h1 style={{textAlign: 'center'}}>Посты не были найдены</h1>
      }
    </div>
  );
}

export default App;
