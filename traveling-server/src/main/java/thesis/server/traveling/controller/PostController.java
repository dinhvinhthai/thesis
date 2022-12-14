package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thesis.server.traveling.constant.SystemConst;
import thesis.server.traveling.entity.*;
import thesis.server.traveling.repository.*;

import java.awt.print.Book;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private ShareRepository shareRepository;

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private BlockRepository blockRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value  = "/getAll/{loginId}")
    public List<Post> getAll(@PathVariable Long loginId){
        List<Post> listPost =  postRepository.findAll();
        List<Block> blocks = blockRepository.findBySourceIdOrTargetId(loginId);
        for(int i = 0; i < listPost.size(); i++){
            for(int j = 0; j < blocks.size(); j++){
                if(listPost.get(i).getUserId() != loginId){
                    if(listPost.get(i).getUserId() == blocks.get(j).getSourceId() || listPost.get(i).getUserId() == blocks.get(j).getTargetId()){
                        listPost.remove(listPost.get(i));
                        i--;
                    }
                }
            }
        }
        for(Post post : listPost) {
            post.setImages(imageRepository.findByPostId(post.getPostId()));
            post.setVideos(videoRepository.findByPostId(post.getPostId()));
        }
        return listPost;
    }

    @GetMapping(value  = "/getAllOfUserId/{userId}")
    public List<Post> getAllOfUserId(@PathVariable Long userId){
        List<Post> listPost =  postRepository.findByUserId(userId);
        List<Block> blocks = blockRepository.findBySourceIdOrTargetId(userId);
        for(int i = 0; i < listPost.size(); i++){
            for(int j = 0; j < blocks.size(); j++){
                if(listPost.get(i).getUserId() != userId){
                    if(listPost.get(i).getUserId() == blocks.get(j).getSourceId() || listPost.get(i).getUserId() == blocks.get(j).getTargetId()){
                        listPost.remove(listPost.get(i));
                        i--;
                    }
                }
            }
        }
        for(Post post : listPost){
            post.setImages(imageRepository.findByPostId(post.getPostId()));
            post.setVideos(videoRepository.findByPostId(post.getPostId()));
        }
        List<Share> shareList = shareRepository.findByUserId(userId);
        for(Share share : shareList){
            Post post = postRepository.findByPostId(share.getPostId());
            if(post != null){
                post.setImages(imageRepository.findByPostId(post.getPostId()));
                post.setVideos(videoRepository.findByPostId(post.getPostId()));
                post.setUser(userRepository.findByUserId(share.getUserId()));
            }
            int count = 0;
            for(Post post1 : listPost){
                if(post1.getPostId().equals(post.getPostId())){
                    count++;
                }
            }
            if(count == 0){
                listPost.add(post);
            }
        }
        return listPost;
    }

    @GetMapping(value  = "/getFollowOfUserId/{userId}")
    public List<Post> getFollowOfUserId(@PathVariable Long userId){
        List<Follow> followList = followRepository.findBySourceId(userId);
        List<Long> targetList =  new ArrayList<Long>();
        for(Follow fl : followList){
            targetList.add(fl.getTargetId());
        }
        List<Post> listPost = postRepository.findByUserListId(targetList);
        List<Block> blocks = blockRepository.findBySourceIdOrTargetId(userId);
        for(int i = 0; i < listPost.size(); i++){
            for(int j = 0; j < blocks.size(); j++){
                if(listPost.get(i).getUserId() != userId){
                    if(listPost.get(i).getUserId() == blocks.get(j).getSourceId() || listPost.get(i).getUserId() == blocks.get(j).getTargetId()){
                        listPost.remove(listPost.get(i));
                        i--;
                    }
                }
            }
        }
        for(Long target: targetList){
            List<Share> shareList = shareRepository.findByUserId(target);
            for(Share share : shareList){
                Post post = postRepository.findByPostId(share.getPostId());
                if(post != null){
                    post.setImages(imageRepository.findByPostId(post.getPostId()));
                    post.setVideos(videoRepository.findByPostId(post.getPostId()));
                    post.setUser(userRepository.findByUserId(share.getUserId()));
                }
                listPost.add(post);
            }
        }
        for(Post post : listPost){
            post.setImages(imageRepository.findByPostId(post.getPostId()));
            post.setVideos(videoRepository.findByPostId(post.getPostId()));
        }
        return listPost;
    }

    @GetMapping(value  = "/getAllVideoPost")
    public List<Post> getAllVideoPost(){
       List<Post> postList = postRepository.findAll();
       List<Post> result = new ArrayList<>();
        for(Post post : postList){
           Video videoPost = videoRepository.findByPostId(post.getPostId());
           if (videoPost != null){
               post.setVideos(videoRepository.findByPostId(post.getPostId()));
               result.add(post);
           }
       }
        return result;
    }

    @GetMapping(value  = "/getById/{postId}")
    public Optional<Post> getById(@PathVariable Long postId){
        return postRepository.findById(postId);
    }

    @PostMapping(value  = "/create")
    public ResponseEntity<Object> create(@RequestPart("post") Post post, @RequestPart("file") @Nullable List<MultipartFile> fileList, @RequestPart("type") @Nullable String type) throws IOException {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        post.setRegDate(now);
        post.setUpdateDate(now);
        post.setIsDelete(SystemConst.FLG_OFF);
        postRepository.save(post);
        //update img or video
        if(fileList != null && !fileList.isEmpty()){
            for(MultipartFile file : fileList){
                file.transferTo(new File(SystemConst.UPLOAD_DIRECTORY, file.getOriginalFilename()));
                if(type.equals("img")){
                    Image img = new Image();
                    img.setPostId(post.getPostId());
                    img.setUserId(post.getUserId());
                    img.setPath(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
                    img.setRegDate(now);
                    imageRepository.save(img);
                } else {
                    Video video = new Video();
                    video.setPostId((post.getPostId()));
                    video.setUserId(post.getUserId());
                    video.setPath(SystemConst.UPLOAD_LOCATION + file.getOriginalFilename());
                    video.setRegDate(now);
                    videoRepository.save(video);
                }
            }
        }
        return new ResponseEntity<Object>(
                "Tạo bài viết thành công", new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping(value  = "/delete/{postId}")
    public ResponseEntity<Object> create(@PathVariable Long postId) throws IOException {
        List<Share> shareList = shareRepository.findByPostId(postId);
        for(Share share : shareList){
            shareRepository.deleteById(share.getShareId());
        }
        List<Like> likeList = likeRepository.findByPostId(postId);
        for(Like like : likeList){
            likeRepository.deleteById(like.getLikeId());
        }
        List<Comment> comList = commentRepository.findByPostId(postId);
        for(int i = comList.size()-1; i >= 0; i--){
            commentRepository.deleteById(comList.get(i).getCommentId());
        }
        List<Image> imageList= imageRepository.findByPostId(postId);
        for(Image img : imageList){
            imageRepository.deleteById(img.getImageId());
        }
        Video video = videoRepository.findByPostId(postId);
        if(video != null){
            videoRepository.deleteById(video.getVideoId());
        }
        List<Bookmark> bookmarkList = bookmarkRepository.findByPostId(postId);
        for(Bookmark bm : bookmarkList){
            bookmarkRepository.deleteById(bm.getBookmarkId());
        }
        List<Report> reportList = reportRepository.findByPostId(postId);
        for(Report report: reportList){
            reportRepository.deleteById(report.getReportId());
        }
        postRepository.deleteById(postId);
        return new ResponseEntity<Object>(
                "Xóa bài viết thành công", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value  = "/updateStatus/{postId}")
    public ResponseEntity<Object> create(@PathVariable Long postId, @RequestBody Post post) throws IOException {
        Post oldPost = postRepository.findByPostId(postId);
        oldPost.setStatus(post.getStatus());
        Timestamp now = new Timestamp(System.currentTimeMillis());
        oldPost.setUpdateDate(now);
        postRepository.save(oldPost);
        return new ResponseEntity<Object>(
                "Cập nhật thành công.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value  = "/adminDelete")
    public ResponseEntity<Object> adminDelete(@RequestBody Post post) throws IOException {
        Post oldPost = postRepository.findByPostId(post.getPostId());
        oldPost.setIsDelete(SystemConst.FLG_ON);
        postRepository.save(oldPost);
        return new ResponseEntity<Object>(
                "Xóa bài viết thành công.", new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value  = "/adminUndoDelete")
    public ResponseEntity<Object> adminUndoDelete(@RequestBody Post post) throws IOException {
        Post oldPost = postRepository.findByPostId(post.getPostId());
        oldPost.setIsDelete(SystemConst.FLG_OFF);
        postRepository.save(oldPost);
        return new ResponseEntity<Object>(
                "Khôi phục bài viết thành công.", new HttpHeaders(), HttpStatus.OK);
    }
}
