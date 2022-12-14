package thesis.server.traveling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thesis.server.traveling.entity.Block;
import thesis.server.traveling.entity.Bookmark;
import thesis.server.traveling.repository.BlockRepository;
import thesis.server.traveling.repository.UserRepository;

import java.sql.Timestamp;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value = "/api/block")
public class BlockController {
    @Autowired
    BlockRepository blockRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/getAll")
    public List<Block> getAll(){
        return blockRepository.findAll();
    }

    @GetMapping(value = "/getByUSerId/{userId}")
    public List<Block> getByUSerId(@PathVariable Long userId){
        List<Block> blocks = blockRepository.findBySourceId(userId);
        for(Block block : blocks){
            block.setUser(userRepository.findByUserId(block.getTargetId()));
        }
        return blocks;

    }

    @PostMapping(value  = "/create")
    public ResponseEntity<Object> create(@RequestBody Block block) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        block.setRegDate(now);
        blockRepository.save(block);
        return new ResponseEntity<Object>(
                "Đã chặn thành công", new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping(value  = "/delete/{blockId}")
    public ResponseEntity<Object> delete(@PathVariable Long blockId) {
        blockRepository.deleteById(blockId);
        return new ResponseEntity<Object>(
                "Đã bỏ chặn thành công", new HttpHeaders(), HttpStatus.OK);
    }
}
