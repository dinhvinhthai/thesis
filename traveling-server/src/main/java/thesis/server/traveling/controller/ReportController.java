package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.constant.SystemConst;
import thesis.server.traveling.entity.Post;
import thesis.server.traveling.entity.Report;
import thesis.server.traveling.repository.*;

import java.sql.Timestamp;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value = "/api/report")
public class ReportController {
    @Autowired
    ReportRepository reportRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private VideoRepository videoRepository;

    @PostMapping(value = "/create")
    public ResponseEntity<Object> create(@RequestBody Report report) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        report.setRegDate(now);
        report.setStatus(SystemConst.FLG_OFF);
        reportRepository.save(report);
        return new ResponseEntity<Object>(
                "Đã gửi báo cáo thành công.", new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping(value = "/getAll")
    public List<Report> getAll() {
        List<Report> reportList = reportRepository.findAll();
        for(Report report : reportList){
            report.setSourceUser(userRepository.findByUserId(report.getSourceId()));
            report.setTargetUser(userRepository.findByUserId(report.getTargetId()));
            if(report.getPostId() != null){
                Post post = postRepository.findByPostId((report.getPostId()));
                if(post != null){
                    post.setImages(imageRepository.findByPostId(post.getPostId()));
                    post.setVideos(videoRepository.findByPostId(post.getPostId()));
                }
                report.setPost(post);
            }
        }
        return reportList;
    }

    @PostMapping(value = "/updateStatus")
    public ResponseEntity<Object> updateStatus(@RequestBody Report report) {
        Report oldReport = reportRepository.findByReportId(report.getReportId());
        if(oldReport.getStatus().equals(SystemConst.FLG_OFF)){
            oldReport.setStatus(SystemConst.FLG_ON);
        } else {
            oldReport.setStatus(SystemConst.FLG_OFF);
        }
        reportRepository.save(oldReport);
        return new ResponseEntity<Object>(
                "Đã cập nhật.", new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping(value  = "/delete/{reportId}")
    public HttpEntity<Object> delete(@PathVariable Long reportId){
        reportRepository.deleteById(reportId);
        return new ResponseEntity<Object>(
                "Đã xóa thông báo.", new HttpHeaders(), HttpStatus.OK);
    }
}
