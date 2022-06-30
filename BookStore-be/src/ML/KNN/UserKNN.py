from src.ML.AutoRec.AutoRecAlgorithm import AutoRecAlgorithm
from src.ML.RecommenderMetrics import RecommenderMetrics
from surprise.model_selection import train_test_split
from surprise.model_selection import LeaveOneOut
from surprise import KNNBasic, accuracy
from surprise.model_selection import GridSearchCV

class UserKNN:
    def __init__(self, data):
        self.data = data

    def evaluate(self, userId):
        self.fullTrainSet = self.data.build_full_trainset() 
        
        self.algo = KNNBasic(sim_options = {'name': 'cosine', 'user_based': True})
        self.algo.fit(self.fullTrainSet)
        testSet = self.BuildAntiTestSetForUser(userId)    
        predictions = self.algo.test(testSet)

        recommendations = []
        for userID, bookID, actualRating, estimatedRating, _ in predictions:
                intBookID = int(bookID)
                recommendations.append((intBookID, estimatedRating))
            
        recommendations.sort(key=lambda x: x[1], reverse=True)

        return recommendations
    
    def accuracy(self):
        metrics = {}
        trainSet, testSet = train_test_split(self.data, test_size=.25, random_state=1)
        
        self.algo.fit(trainSet)
        temp_predictions = self.algo.test(testSet)

        metrics["RMSE"] = RecommenderMetrics.RMSE(temp_predictions)
        metrics["MAE"] = RecommenderMetrics.MAE(temp_predictions)

        #Evaluate top10 with Leave-one-Out
        LOOCV = LeaveOneOut(n_splits=1, random_state=1)
        for train, test in LOOCV.split(self.data):
            LOOCVTrain = train
            LOOCVTest = test

        LOOCVAntiTestSet = LOOCVTrain.build_anti_testset()

        self.algo.fit(LOOCVTrain)
        leftOutPredictions = self.algo.test(LOOCVTest)
        allPredictions = self.algo.test(LOOCVAntiTestSet)

        topNPredicted = RecommenderMetrics.GetTopN(allPredictions, 10)
        metrics["HR"] = RecommenderMetrics.HitRate(topNPredicted, leftOutPredictions)   
        metrics["cHR"] = RecommenderMetrics.CumulativeHitRate(topNPredicted, leftOutPredictions)
        metrics["ARHR"] = RecommenderMetrics.AverageReciprocalHitRank(topNPredicted, leftOutPredictions)

        return metrics

    def BuildAntiTestSetForUser(self,userId):
        trainset = self.fullTrainSet
        fill = trainset.global_mean

        anti_testset = []
        
        u = trainset.to_inner_uid(userId)
        
        user_items = set([j for (j, _) in trainset.ur[u]])
        anti_testset += [(trainset.to_raw_uid(u), trainset.to_raw_iid(i), fill) for
                                i in trainset.all_items() if
                                i not in user_items]
        return anti_testset
    
